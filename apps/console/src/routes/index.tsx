import { createFileRoute, Link } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import Xarrow from "react-xarrows";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Helmet>
        <title>Keisha - Key-Value Database Management Platform</title>
        <meta
          name="description"
          content="Lightweight, one-file key-value database with intuitive management console. Like SQLite, but for key-value storage."
        />
      </Helmet>

      <nav className="relative z-20 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/dancing.png"
              alt="Keisha"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-semibold text-gray-900">Keisha</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Product
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Blog
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-2.5 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-colors"
            >
              Start Free
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-20 h-20 mx-auto flex items-center justify-center mb-2">
              <img
                src="/dancing.png"
                alt="Keisha"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-900 mb-8 ">
            Lightweight, one-file
            <br />
            key-value <span className="font-medium">database</span>
          </h1>

          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Like SQLite, but built for key-value data.
              <br />
              Just one <span className="font-mono text-gray-900">
                .kei
              </span>{" "}
              file. Dead-simple reads, writes, and deletes.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative group">
            <a
              href="#"
              id="docs-button"
              className="inline-block px-8 py-4 bg-accent text-white rounded-full hover:bg-accent/90 transition-all duration-300 relative z-10 shadow-lg hover:shadow-violet-500/30 group-hover:shadow-violet-500/30"
            >
              Documentation
            </a>
            <div className="group/demo">
              <Link
                to="/login"
                id="demo-button"
                className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 rounded-full hover:border-accent hover:text-accent transition-all duration-300 relative z-10 shadow-lg hover:shadow-gray-500/30 group-hover/demo:shadow-gray-500/30"
              >
                <svg
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6 4h6M12 1v6m0 0l4-4m-4 4L8 3"
                  />
                </svg>
                Interactive Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative group">
            <div
              className="bg-white rounded-3xl p-8 border border-gray-200 relative overflow-hidden hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-violet-500/15 group-hover:shadow-violet-500/15"
              id="keisha-card"
            >
              <div className="inline-flex items-center px-3 py-1 bg-accent/30 text-accent text-sm font-medium rounded-full mb-6">
                OPEN SOURCE
              </div>

              <h2 className="text-3xl text-gray-900 mb-4">Keisha</h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                A lightweight key-value database that goes anywhere. Offline, in
                the browser, or on-device.
              </p>

              <div className="bg-gray-100 rounded-xl p-4 mb-8 border border-gray-200">
                <code className="text-accent font-mono text-sm">
                  curl -sSL keisha.io/install | sh 📦
                </code>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-accent mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">
                      Single File
                    </h3>
                    <p className="text-gray-500 text-xs">
                      One .kei file contains everything.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-accent mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">
                      Zero Config
                    </h3>
                    <p className="text-gray-500 text-xs">
                      No setup required, just start coding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-accent mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">
                      Fast Operations
                    </h3>
                    <p className="text-gray-500 text-xs">
                      Optimized for speed and efficiency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-accent mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">
                      Simple API
                    </h3>
                    <p className="text-gray-500 text-xs">
                      Clean, intuitive interface.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl border-2 border-accent/10 pointer-events-none"></div>
            </div>

            <div
              className="bg-white rounded-3xl p-8 border border-gray-200 relative overflow-hidden hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-gray-500/15 group-hover:shadow-gray-500/15"
              id="cloud-card"
            >
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full mb-6">
                PRODUCTION READY
              </div>

              <h2 className="text-3xl text-gray-900 mb-4">Keisha Cloud</h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Create unlimited Keisha databases in the cloud for production
                workloads. Serverless access or sync.
              </p>

              <div className="mb-8">
                <a
                  href="#"
                  className="inline-block px-6 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-colors"
                >
                  Create Database
                </a>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-green-600 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">
                      Global Edge
                    </h3>
                    <p className="text-gray-500 text-xs">
                      Distributed worldwide for low latency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-green-600 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">
                      Real-time Sync
                    </h3>
                    <p className="text-gray-500 text-xs">
                      Keep devices in sync automatically.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-green-600 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">
                      Auto Backups
                    </h3>
                    <p className="text-gray-500 text-xs">
                      Never lose your data again.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-green-600 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">
                      Analytics
                    </h3>
                    <p className="text-gray-500 text-xs">
                      Monitor performance and usage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl border-2 border-gray-200/50 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      <Xarrow
        start="docs-button"
        end="keisha-card"
        color="#8b5cf6"
        strokeWidth={2}
        dashness={{ strokeLen: 8, nonStrokeLen: 4, animation: 2 }}
        curveness={0.8}
        showHead={false}
        startAnchor="bottom"
        endAnchor="top"
      />

      <Xarrow
        start="demo-button"
        end="cloud-card"
        color="#6b7280"
        strokeWidth={2}
        dashness={{ strokeLen: 8, nonStrokeLen: 4, animation: 2 }}
        curveness={0.8}
        showHead={false}
        startAnchor="bottom"
        endAnchor="top"
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 800"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M0 0C0 0 300 200 720 200C1140 200 1440 0 1440 0V800H0V0Z"
              fill="url(#gradient)"
              fillOpacity="0.1"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 800"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M0 100C0 100 400 300 720 300C1040 300 1440 100 1440 100V800H0V100Z"
              fill="url(#gradient2)"
              fillOpacity="0.05"
            />
            <defs>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
