import React from 'react';
import Link from 'next/link';
import { Filter, ExternalLink } from 'lucide-react';

const JournalPreviewTable = ({ journals }) => {
  return (
    <div className="mt-20 relative">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Journals</h2>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
              <span>Export data</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-6 py-3"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Journal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Abbreviation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Publisher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISSN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  eISSN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PPI Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="w-12 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {journals.map((journal, index) => (
                <tr 
                  key={journal.id} 
                  className="hover:bg-gray-50 transition-colors pointer-events-none"
                  style={{
                    opacity: 1 - (index * 0.25)
                  }}
                >
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      disabled
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {journal.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {journal.abbreviation}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {journal.publisher}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {journal.issn || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {journal.eissn || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {journal.ppi}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {journal.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white to-transparent pointer-events-none"></div>
      </div>

      {/* Explore Button */}
      <div className="flex justify-center mt-8 relative z-10">
        <Link
          href="/journals"
          className="px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
        >
          Explore full directory
        </Link>
      </div>
    </div>
  );
};

export default JournalPreviewTable;