import "./App.css";
import { articles } from "./articles";
import { useReadingListStore } from "./store";

function App() {
  const addToReadingList = useReadingListStore(
    (state) => state.addToReadingList
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "4rem",
      }}
    >
      <div className="">
        {articles.map((article) => (
          <article key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <button onClick={() => addToReadingList(article.id)}>➕</button>
          </article>
        ))}
      </div>
      <ReadingList />
    </div>
  );
}

export default App;

function ReadingList() {
  const readingList = useReadingListStore((state) => state.readingList);
  const removeFromReadingList = useReadingListStore(
    (state) => state.removeFromReadingList
  );
  const clearReadingList = useReadingListStore(
    (state) => state.emptyReadingList
  );

  const readingListArticles = articles
    .filter((article) => readingList.includes(article.id))
    .sort((a, b) => {
      return readingList.indexOf(a.id) - readingList.indexOf(b.id);
    });

  return (
    <div>
      <h2>Reading list ({readingList.length})</h2>
      <hr />
      {readingList.length > 0 && (
        <button onClick={() => clearReadingList()}>Clear</button>
      )}
      <ul>
        {readingListArticles.map((article) => (
          <li key={article.id}>
            {article.title}{" "}
            <button onClick={() => removeFromReadingList(article.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
