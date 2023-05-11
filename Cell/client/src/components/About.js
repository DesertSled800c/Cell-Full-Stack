export const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-header">About Conway's Game of Life</h2>
      <p className="about-text">
        Conway's Game of Life is a cellular automaton, which is a type of
        mathematical model that consists of a grid of cells that can be in one
        of two states, typically "alive" or "dead". The Game of Life is played
        on an infinite two-dimensional grid, where each cell has eight neighbors
        (horizontally, vertically, and diagonally adjacent cells).
      </p>
      <p className="about-text">
        The rules of the Game of Life are very simple, yet they can produce
        complex and interesting patterns. At each step, or "generation", of the
        game, the following rules are applied simultaneously to every cell:
      </p>
      <ol className="about-list">
        <li>
          Any live cell with fewer than two live neighbors dies, as if by under
          population.
        </li>
        <li>
          Any live cell with two or three live neighbors lives on to the next
          generation.
        </li>
        <li>
          Any live cell with more than three live neighbors dies, as if by
          overpopulation.
        </li>
        <li>
          Any dead cell with exactly three live neighbors becomes a live cell,
          as if by reproduction.
        </li>
      </ol>
      <p className="about-text">
        These rules create patterns that can evolve over time, sometimes
        stabilizing into static patterns, sometimes oscillating between
        different patterns, and sometimes even creating moving patterns that
        appear to "travel" across the grid.
      </p>
      <p className="about-text">
        The Game of Life was invented by mathematician John Conway in 1970, and
        it has since become a popular topic of study in mathematics, computer
        science, and other fields. It is also a favorite of hobbyists and
        enthusiasts who enjoy creating and exploring the patterns that can arise
        from this simple set of rules.
      </p>
      <div className="image-container">
        <img
          src="https://static01.nyt.com/images/2020/12/29/science/00SCI-CONWAY1/merlin_181606980_defa4a29-08c5-40e6-b2b5-6bb2c10d79a5-superJumbo.jpg?quality=75&auto=webp"
          alt="Conway's Game of Life"
          className="image"
        />
      </div>
      <div className="image-container">
        <img
          src="https://static01.nyt.com/images/2020/12/29/science/00SCI-CONWAY2/merlin_181607049_b5ae79b5-72ba-46ab-9909-ddd17c929b8d-superJumbo.jpg?quality=75&auto=webp"
          alt="Conway's Game of Life"
          className="image"
        />
      </div>
      <div className="video-container">
        <iframe
          className="video"
          src="https://www.youtube.com/embed/Kk2MH9O4pXY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
