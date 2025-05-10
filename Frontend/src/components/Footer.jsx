export const Footer = () => {
  return (
    <footer className="bg-[#F5F7FA] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-bold text-[#2C3E50] mb-4">
              About Job Portal
            </h3>
            <p className="text-sm text-[#2C3E50]/80">
              Connecting talent with opportunity. Explore thousands of jobs and
              build your career with us.
            </p>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 border-t border-[#A9CCE3]/50 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-[#2C3E50] hover:text-[#2980B9] transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.58 8.06 8.24 8.86v-6.27H7.96v-2.59h2.32V9.67c0-2.29 1.36-3.55 3.45-3.55 1 0 2.05.18 2.05.18v2.25h-1.15c-1.14 0-1.49.71-1.49 1.44v1.73h2.53l-.4 2.59h-2.13v6.27c4.66-.8 8.24-4.45 8.24-8.86 0-5.5-4.46-9.96-9.96-9.96z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-[#2C3E50] hover:text-[#2980B9] transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C3.36 3.5 2 4.86 2 6.48v11.04c0 1.62 1.36 2.98 2.98 2.98h14.04c1.62 0 2.98-1.36 2.98-2.98V6.48c0-1.62-1.36-2.98-2.98-2.98H4.98zm3.02 15.5v-6.75h-2.25v6.75h2.25zm-1.13-7.88c.78 0 1.35-.57 1.35-1.28s-.57-1.28-1.35-1.28-1.35.57-1.35 1.28.57 1.28 1.35 1.28zm9 7.88h2.25v-3.83c0-2.03-.86-3.41-2.7-3.41-1.11 0-1.86.62-2.16 1.2v-1.21h-2.25v6.75h2.25v-3.6c0-.95.07-1.91.49-2.59.56-.92 1.37-1.5 2.37-1.5 1.67 0 2.25 1.28 2.25 3.38v4.31z" />
              </svg>
            </a>
          </div>
          <p className="text-sm text-[#2C3E50]/80">
            © 2025 Job Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
