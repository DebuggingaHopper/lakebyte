import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  basePath = '/' 
}: PaginationProps) {
  const pages = [];
  
  // Generate page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    // Show first page, last page, current page, and pages around current
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-12 mb-8" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}page/${currentPage - 1}`}
          className="px-4 py-2 rounded-lg bg-PaginationBg text-PaginationText hover:bg-PaginationBgHover hover:text-TitleText transition-all duration-300 font-medium select-none"
        >
          ← Previous
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-PaginationDisabled text-PaginationTextDisabled cursor-not-allowed select-none">
          ← Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-4 py-2 text-Description select-none">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;
          const href = pageNum === 1 ? basePath : `${basePath}page/${pageNum}`;

          return (
            <Link
              key={pageNum}
              href={href}
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium select-none ${
                isActive
                  ? 'bg-PaginationActive text-PaginationActiveText font-bold shadow-lg'
                  : 'bg-PaginationBg text-PaginationText hover:bg-PaginationBgHover hover:text-TitleText hover:shadow-md'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}page/${currentPage + 1}`}
          className="px-4 py-2 rounded-lg bg-PaginationBg text-PaginationText hover:bg-PaginationBgHover hover:text-TitleText transition-all duration-300 font-medium select-none"
        >
          Next →
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-PaginationDisabled text-PaginationTextDisabled cursor-not-allowed select-none">
          Next →
        </span>
      )}
    </nav>
  );
}