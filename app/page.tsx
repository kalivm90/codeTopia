import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover and Share
            {/* <br className="max-md:hidden"/> */}
            <br />
            <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            CodeTopia is an open-source AI prompting tool for moddern world to discover, create and share creative prompts
        </p>

        {/* FEED */}
        <Feed/>
    </section>
  )
}

export default Home
