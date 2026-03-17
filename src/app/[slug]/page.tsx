import InvitationClient from "@/components/invitation/invitation-client";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function GuestPage({ params }: PageProps) {
  const { slug } = await params;

  return <InvitationClient slug={slug} />;
}
