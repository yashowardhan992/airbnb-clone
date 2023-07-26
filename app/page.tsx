import { useEffect, useState } from "react";
import { useClient } from "next/client";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListingById, { IParams as ListingParams } from "@/app/actions/getListingById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  listingId: string; // Assuming you have the listing ID as a prop
}

const Home: React.FC<HomeProps> = ({ listingId }) => {
  const client = useClient();
  const [listing, setListing] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingData = await getListingById({ listingId });
        const currentUserData = await getCurrentUser();

        setListing(listingData);
        setCurrentUser(currentUserData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [client, listingId]);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        {/* Render the listing card with the fetched data */}
        <ListingCard
          currentUser={currentUser}
          key={listing.id}
          data={listing}
        />
      </Container>
    </ClientOnly>
  );
};

export default Home;
