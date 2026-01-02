import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubdomainData } from "@/lib/subdomains";
import { protocol, rootDomain } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain,
    };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `Subdomain page for ${subdomain}.${rootDomain}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ subdomain: string; slug?: string[] }>;
}) {
  const { subdomain, slug } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  const isRootPage = !slug || slug.length === 0;

  if (isRootPage) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="absolute top-4 right-4">
          <Link
            href={`${protocol}://${rootDomain}`}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {rootDomain}
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {subdomain}
            </h1>

            <div className="my-6">
              <div>
                <header>
                  <h2>
                    Welcome to {subdomain}.{rootDomain}
                  </h2>
                </header>
                <p>Your personalized subdomain page</p>
                <div>Explore the features and customize your experience.</div>
                <div>
                  <button>Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
