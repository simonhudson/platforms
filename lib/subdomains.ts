import { redis } from "@/lib/redis";

type SubdomainData = {
  createdAt: number;
  uuid: string;
};

export const getSubdomainData = async (subdomain: string) => {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");
  const data = await redis.get<SubdomainData>(
    `subdomain:${sanitizedSubdomain}`
  );
  return data;
};

export const getAllSubdomains = async () => {
  const keys = await redis.keys("subdomain:*");

  if (!keys.length) {
    return [];
  }

  const values = await redis.mget<SubdomainData[]>(...keys);

  return keys.map((key, index) => {
    const subdomain = key.replace("subdomain:", "");
    const data = values[index];

    return {
      subdomain,
      createdAt: data?.createdAt || Date.now(),
      uuid: data?.uuid,
    };
  });
};
