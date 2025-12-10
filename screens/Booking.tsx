import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_HELPERS } from '../constants';
import { useAuthStore, useBookingStore } from '../store';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, CheckCircle, CreditCard } from 'lucide-react';
import { Booking } from '../types';

const STEPS = ['Session', 'Date & Time', 'Payment'];

export const BookingFlow: React.FC = () => {
  const { helperId } = useParams<{ helperId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addBooking } = useBookingStore();
  const helper = MOCK_HELPERS.find(h => h.id === helperId);

  const [step, setStep] = useState(0);
  const [duration, setDuration] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!helper) return <div>Helper not found</div>;

  const total = helper.hourlyRate * duration;

  const handleBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newBooking: Booking = {
        id: Date.now().toString(),
        helperId: helper.id,
        studentId: user?.id || 'guest',
        helperName: helper.name,
        studentName: user?.name || 'Guest',
        date,
        time,
        duration,
        totalPrice: total,
        status: 'confirmed',
        subject: 'General Help'
      };
      addBooking(newBooking);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-6">You are all set with {helper.name} for {date} at {time}.</p>
        <Button onClick={() => navigate('/home')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Steps */}
      <div className="flex justify-between mb-8 px-4">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
              step >= i ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-slate-800'
            }`}>
              {i + 1}
            </div>
            <span className="text-xs text-gray-500">{s}</span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        {/* Step 1: Session Details */}
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Choose Session Duration</h2>
            <div className="grid grid-cols-3 gap-4">
              {[0.5, 1, 2].map(hrs => (
                <button
                  key={hrs}
                  onClick={() => setDuration(hrs)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    duration === hrs 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-lg">{hrs} hr{hrs > 1 ? 's' : ''}</div>
                  <div className="text-sm text-gray-500">${helper.hourlyRate * hrs}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(1)}>Next: Date & Time</Button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Select Date & Time</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-800 dark:border-gray-700"
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            {date && (
              <div>
                <label className="block text-sm font-medium mb-2">Available Times</label>
                <div className="grid grid-cols-3 gap-3">
                  {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`py-2 px-3 text-sm rounded-lg border ${
                        time === t 
                          ? 'bg-primary-600 text-white border-primary-600' 
                          : 'border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-slate-800'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
              <Button disabled={!date || !time} onClick={() => setStep(2)}>Next: Payment</Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Review & Pay</h2>
            
            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg space-y-2">
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Helper</span>
                 <span className="font-medium">{helper.name}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Date & Time</span>
                 <span className="font-medium">{date} at {time}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Duration</span>
                 <span className="font-medium">{duration} hr{duration > 1 ? 's' : ''}</span>
               </div>
               <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2 flex justify-between text-lg font-bold">
                 <span>Total</span>
                 <span>${total}</span>
               </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center space-x-3 opacity-70">
               <CreditCard size={24} />
               <div className="flex-1">
                 <div className="text-sm font-medium">•••• •••• •••• 4242</div>
                 <div className="text-xs text-gray-500">Visa ending in 4242</div>
               </div>
               <div className="text-xs font-bold text-primary-600">Change</div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleBooking} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Pay $${total}`}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};