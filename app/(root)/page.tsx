import Navbar from "@/components/Navbar";

export default async function Home( {searchParams}: {
  searchParams: Promise<{ query?: string }>
} ) {
  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1, name: "Ashley Ken" },
    description: 'This is a description',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkx5ZFWDHQo7hnTQYa0LKTQuoEDwqryttKmQ&s",
    category: 'Robots',
    title: 'We Robots'
  }]

  return (
    <>
      <Navbar />
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br/>
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : 'All startups'}
        </p>
      </section>
    </>
  );
}
