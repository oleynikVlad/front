import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-lg font-bold text-white">DevBlog</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              A modern blog platform for developers. Share knowledge, learn new skills, and grow together.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Blog</Link></li>
              <li><Link href="/search" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Search</Link></li>
              <li><Link href="/todo" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Ideas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/search?category=programming" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Programming</Link></li>
              <li><Link href="/search?category=design" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Design</Link></li>
              <li><Link href="/search?category=ai" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">AI & ML</Link></li>
              <li><Link href="/search?category=devops" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">DevOps</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">More</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Sign In</Link></li>
              <li><Link href="/blog/new" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Write Post</Link></li>
              <li><Link href="/profile" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Profile</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} DevBlog. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">Built with Next.js, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
