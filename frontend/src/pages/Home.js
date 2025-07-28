import React from "react";

const Home = () => (
  <div>
    <h2 className="text-center">Welcome to Classic Royal Printers</h2>
    <hr className="section-divider" />

    <section id="About" className="text-center">
      <h2>About Us</h2>
      <p>
        Classic Royal Printers specializes in crafting premium-quality printed boxes, especially for the pharmaceutical industry.
        Our precision, creativity, and dedication to quality help us deliver unmatched solutions. Whether it's elegant pamphlets,
        customized stickers, or standout product packaging, we turn ideas into printed perfection.
      </p>
    </section>

    <hr className="section-divider" />

    <section id="products" className="text-center">
      <h2>Our Products</h2>
      <ul className="product-list">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
          <li key={i}>
            <img src={`/images/product (${i}).jpg`} alt={`Product ${i}`} />
          </li>
        ))}
      </ul>
    </section>

    <hr className="section-divider" />

    <section id="gallery" className="text-center">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {[1, 2, 3, 4, 5, 6, 8, 9].map(i => (
          <img key={i} src={`/images/machines (${i}).jpg`} alt={`machines(${i})`} />
        ))}
        <img src="/images/bobst sp.jpeg" alt="bobst sp" />
        <img src="/images/die cutter.jpeg" alt="die cutter" />
        <img src="/images/fold and glue.jpg" alt="fold and glue" />
        <img src="/images/heidelberg.jpeg" alt="heidelberg" />
        <video controls>
          <source src="/videos/sample1.mp4" type="video/mp4" />
        </video>
        <video controls>
          <source src="/videos/sample2.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <hr className="section-divider" />

    <section id="contact" className="text-center">
      <h2>Contact Us</h2>
      <p><strong>Name:</strong> Abdul Wahab</p>
      <p><strong>Phone:</strong> BCS-223121</p>
      <p><strong>Address:</strong> CUST (Islamabad Expressway, Kahuta، Road Zone-V Sihala, Islamabad, Pakistan)</p>
    </section>
  </div>
);

export default Home;