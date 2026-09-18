import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { inquiryApi } from '../services/inquiryApi';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export const Contact = () => {
  const { settings } = useWebsite();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: searchParams.get('destination')
      ? `Inquiry for ${searchParams.get('destination')} Tour`
      : searchParams.get('service')
      ? `Inquiry for ${searchParams.get('service')}`
      : '',
    destination: searchParams.get('destination') || '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please complete all required fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await inquiryApi.create(formData);
      if (res.success) {
        setSubmitted(true);
        toast.success(res.message || 'Inquiry submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          destination: '',
          message: ''
        });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-navy-950 text-white py-16 px-4 sm:px-6 relative overflow-hidden text-center">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-300 uppercase tracking-widest bg-brand-500/20 px-3 py-1 rounded-full mb-3 border border-brand-400/30">
            <Headphones className="w-3.5 h-3.5" /> We Are Here For You
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Contact & Travel Inquiries
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Have questions about a holiday package, need a custom cab quote, or want personal recommendations? Talk to our travel experts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left 1 Col: Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100 space-y-6">
            <h3 className="text-xl font-bold text-navy-900">Direct Office Contacts</h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-900">Registered Office</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {settings.address || 'Amb, Himachal Pradesh 177203, India'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-900">Phone Support (24/7)</h4>
                <a href={`tel:${settings.phone || '7018088530'}`} className="text-xs text-brand-600 font-semibold mt-1 block">
                  {settings.phone || '70180 88530'}
                </a>
                {settings.altPhone && (
                  <a href={`tel:${settings.altPhone}`} className="text-xs text-slate-500 block">
                    {settings.altPhone}
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-900">Email Inquiries</h4>
                <a href={`mailto:${settings.email || 'info@ravitravels.com'}`} className="text-xs text-brand-600 font-semibold mt-1 block">
                  {settings.email || 'info@ravitravels.com'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-900">Office Working Hours</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {settings.businessHours || 'Mon - Sat: 9:00 AM - 8:00 PM'}
                </p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${(settings.whatsapp || '').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp Instant
            </a>
          </div>
        </div>

        {/* Right 2 Cols: Form + Google Maps */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-slate-100">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Send Us an Inquiry</h2>
            <p className="text-xs text-slate-500 mb-8">
              Leave your details below. Our holiday consultant will reach out via call or WhatsApp within 2 hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-900">Inquiry Received!</h3>
                <p className="text-xs text-emerald-700 mt-1 mb-6">
                  Thank you for contacting Ravi Tour & Travels. Our specialist is already preparing your details and will call you shortly.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Rahul Sen"
                      className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. rahul@example.com"
                      className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Manali 5 Days Package Inquiry"
                      className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Message / Requirement *</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us your travel dates, number of travelers, budget, or any specific questions..."
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full sm:w-auto px-8 py-3 font-bold text-sm shadow-md"
                >
                  <Send className="w-4 h-4 mr-2" /> Submit Inquiry
                </Button>
              </form>
            )}
          </div>

          {/* Google Maps Embed Section */}
          <div className="bg-white rounded-3xl p-4 shadow-soft border border-slate-100 overflow-hidden">
            <iframe
              title="Ravi Tour & Travels Office Location"
              src="https://maps.google.com/maps?q=Kangra,+Himachal+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="320"
              style={{ border: 0, borderRadius: '1rem' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
