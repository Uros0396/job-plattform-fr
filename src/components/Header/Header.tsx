const Header: React.FC = () => {
  return (
    <div className="bg-black text-red-500 w-full">
      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold mb-6">Website presentation</h1>
        <img
          src="/src/assets/81e840943c8efee972ea4e26292ffbd9.jpg"
          alt="Website"
          className="max-w-full h-auto mb-6"
        />
        <p className="max-w-2xl p-5 text-center text-base leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          perspiciatis velit officiis nisi! Facere ex doloribus nisi ipsa
          quaerat error, quia quis in ipsum nemo minima fugiat consequatur quo
          aperiam laudantium odit obcaecati dicta ratione itaque architecto
          facilis vel porro eaque totam! Cupiditate laboriosam ab facilis labore
          repellendus eveniet consequatur nobis illum, dolore expedita, dolorum
          neque. Est nostrum consectetur illo commodi quam mollitia saepe
          consequatur ipsum totam odit dicta dolor aliquam consequuntur
          doloremque ad perspiciatis excepturi nesciunt, tempore rerum tenetur.
        </p>
      </div>
    </div>
  );
};

export default Header;
