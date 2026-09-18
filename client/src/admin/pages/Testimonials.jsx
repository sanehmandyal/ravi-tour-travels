import React, { useEffect, useState } from 'react';
import { testimonialApi } from '../../services/testimonialApi';
import { Star, CheckCircle, XCircle, Trash2, PlusCircle, MessageSquare } from 'lucide-react';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    customerName: '',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    destination: 'Manali',
    rating: 5,
    review: '',
    status: 'approved'
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await testimonialApi.getAll({ status: '' });
      if (res.success && res.data) {
        setTestimonials(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await testimonialApi.update(id, { status });
      if (res.success) {
        toast.success(`Review ${status}`);
        fetchReviews();
      }
    } catch (err) {
      toast.error(err.message || 'Status update failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      try {
        const res = await testimonialApi.delete(id);
        if (res.success) {
          toast.success('Testimonial removed');
          setTestimonials(prev => prev.filter(t => t._id !== id));
        }
      } catch (err) {
        toast.error(err.message || 'Failed to delete');
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.review) {
      toast.error('Customer name and review are required');
      return;
    }

    try {
      setSubmitting(true);
      const res = await testimonialApi.create(form);
      if (res.success) {
        toast.success('Testimonial added');
        setIsModalOpen(false);
        setForm({
          customerName: '',
          profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          destination: 'Manali',
          rating: 5,
          review: '',
          status: 'approved'
        });
        fetchReviews();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to add');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900 tracking-tight">Testimonials CMS</h1>
          <p className="text-xs text-slate-500">Moderate customer stories, approve guest ratings, and feature reviews.</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <PlusCircle className="w-4 h-4 mr-1.5" /> Add Testimonial
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading testimonials..." />
      ) : testimonials.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No testimonials yet"
          description="Customer reviews submitted on the public website will appear here."
          actionLabel="Add Testimonial"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                    t.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                    t.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={t.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={t.customerName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-navy-900">{t.customerName}</h4>
                    <p className="text-[10px] text-brand-600">{t.destination}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {t.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(t._id, 'approved')}
                      className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                      title="Approve"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  {t.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(t._id, 'rejected')}
                      className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                      title="Reject"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Testimonial Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Customer Testimonial">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Customer Name *</label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              required
              placeholder="e.g. Vikram & Sneha Kapur"
              className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Destination Visited *</label>
              <input
                type="text"
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                required
                placeholder="e.g. Manali"
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Rating (1 to 5)</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:border-brand-500"
              >
                {[5, 4, 3, 2, 1].map(n => (
                  <option key={n} value={n}>{n} Stars</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Customer Review Quote *</label>
            <textarea
              rows={4}
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              required
              placeholder="Write the customer quote here..."
              className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              Save Testimonial
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Testimonials;
