import React from 'react';
import { Mail } from 'lucide-react';

const EmailsSection = () => {
  const emailCategories = [
    {
      title: "Dr Muhammad Latif Anjum",
      email: "latif.anjum@seecs.edu.pk"
    },
    {
      title: "Dr Wajahat Hussain",
      email: "wajahat.hussain@seecs.edu.pk"
    },
    {
      title: "Dr. Syed Taha Ali",
      email: "taha.ali@seecs.edu.pk"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Emails</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {emailCategories.map((category, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-start gap-3 mb-3">
              <Mail className="w-5 h-5 text-gray-600 mt-1 group-hover:text-blue-600 transition-colors" />
              <h3 className="text-lg font-semibold text-gray-900">
                {category.title}
              </h3>
            </div>
            <a 
              href={`mailto:${category.email}`}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors break-all"
            >
              {category.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailsSection;