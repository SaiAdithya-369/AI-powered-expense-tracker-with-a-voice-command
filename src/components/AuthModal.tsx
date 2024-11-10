import React, { useState } from 'react';
import { X, Mail, Phone, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: { email?: string; phone?: string; name: string }) => void;
  onSkip: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onSkip }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState<'email' | 'phone'>('email');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name,
      ...(method === 'email' ? { email } : { phone })
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Plan it</h2>
            <p className="text-gray-600">money management made easier</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                isSignUp ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                !isSignUp ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required={isSignUp}
                />
              </div>
            )}

            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                  method === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Mail size={20} />
                Email
              </button>
              <button
                type="button"
                onClick={() => setMethod('phone')}
                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                  method === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Phone size={20} />
                Phone
              </button>
            </div>

            {method === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              {isSignUp ? (
                <>
                  <UserPlus size={20} />
                  Sign Up
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={onSkip}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};