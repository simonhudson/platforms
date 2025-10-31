import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubdomainData } from "@/lib/subdomains";
import { protocol, rootDomain } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";

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
            <div className="text-9xl mb-6">{subdomainData.emoji}</div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {subdomain}
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              This is your custom subdomain page
            </p>
            <div className="my-6">
              <Button className="my-6">This is a button</Button>
            </div>
            <div className="my-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Welcome to {subdomain}.{rootDomain}
                  </CardTitle>
                </CardHeader>
                <CardDescription>
                  Your personalized subdomain page
                </CardDescription>
                <CardContent>
                  Explore the features and customize your experience.
                </CardContent>
                <CardFooter>
                  <CardAction>
                    <Button variant="secondary">Get Started</Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </div>
            <div className="my-6">
              <Dialog>
                <DialogOverlay />
                <DialogPortal>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        This is a description for the dialog.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter></DialogFooter>
                  </DialogContent>
                </DialogPortal>
                <DialogTrigger>Open dialog</DialogTrigger>
              </Dialog>
            </div>
            <div className="my-6">
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline" className="mt-4">
                    {" "}
                    Open Popover
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="text-sm">This is the popover content.</div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
