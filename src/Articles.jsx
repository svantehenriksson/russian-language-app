import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { articleRegistry, getArticleById } from "./articles/registry";

export default function Articles() {
  const [searchParams] = useSearchParams();
  const viewId = searchParams.get("view") ?? "";
  const selectedArticle = getArticleById(viewId);

  return (
    <div className="container">
      <section className="card info-card">
        <div className="card-header">
          <div className="card-title info-title">Articles</div>
          <div className="card-chip">{articleRegistry.length} available</div>
        </div>
        <div className="card-body info-body">
          {selectedArticle && (
            <section className="article-content">
              <h1 className="article-title">{selectedArticle.title}</h1>
              {selectedArticle.body.map((line, lineIndex) => (
                <div
                  key={`${selectedArticle.id}-${lineIndex}`}
                  className="article-line"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </section>
          )}
          <p className="info-lead">All Articles</p>
          <nav className="articles-toc" aria-label="All articles">
            {articleRegistry.map((article, index) => (
              <Link
                key={article.id}
                className={`articles-toc-link ${selectedArticle?.id === article.id ? "active" : ""}`}
                to={`/articles?view=${article.id}`}
              >
                <span className="articles-toc-index">{index + 1}.</span>
                <span>{article.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
