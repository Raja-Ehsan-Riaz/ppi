// components/JournalCard.jsx
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export default function JournalCard({ journal }) {
  return (
    <Link href={`/journals/${journal.slug}`}>
      <div className="bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all p-6 cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          {/* Left Section - Journal Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {journal.name}
                </h3>
                
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  {journal.abbreviation && <span className="font-medium">{journal.abbreviation}</span>}
                  {journal.category && journal.category.trim() !== '' && (
                    <>
                      {journal.abbreviation && <span>•</span>}
                      <Badge variant="outline" className="font-normal">
                        {journal.category}
                      </Badge>
                    </>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                  <span>{journal.publisher}</span>
                  {journal.issn && (
                    <>
                      <span>•</span>
                      <span>ISSN: {journal.issn}</span>
                    </>
                  )}
                  {journal.eissn && (
                    <>
                      <span>•</span>
                      <span>eISSN: {journal.eissn}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Stats */}
          <div className="flex-shrink-0 text-right">
            <div className="bg-blue-50 rounded-lg px-4 py-2 mb-2">
              <div className="text-2xl font-bold text-blue-600">
                {journal.ppi.toFixed(1)}
              </div>
              <div className="text-xs text-gray-600">PPI Score</div>
            </div>
            
            <div className="text-sm text-gray-600">
              <div>{journal.totalPapers.toLocaleString()} papers</div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Quick Stats */}
        <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">{journal.tier1Papers}</div>
            <div className="text-xs text-gray-500">Top 50</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">{journal.tier2Papers}</div>
            <div className="text-xs text-gray-500">Top 51-100</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">{journal.tier3Papers}</div>
            <div className="text-xs text-gray-500">Top 101-150</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">{journal.tier4Papers}</div>
            <div className="text-xs text-gray-500">Top 151-200</div>
          </div>
        </div>
      </div>
    </Link>
  );
}