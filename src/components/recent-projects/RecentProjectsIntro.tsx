import type { MutableRefObject, RefObject } from "react";

interface RecentProjectsIntroProps {
  introOpen: boolean;
  isIntroTransitioning: boolean;
  isTitleMerging: boolean;
  introRows: string[][];
  introSectionRef: RefObject<HTMLElement | null>;
  introTitleRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  fullviewRef: RefObject<HTMLDivElement | null>;
  rowRefs: MutableRefObject<HTMLDivElement[]>;
  onEnter: () => void;
}

const RecentProjectsIntro = ({
  introOpen,
  isIntroTransitioning,
  isTitleMerging,
  introRows,
  introSectionRef,
  introTitleRef,
  gridRef,
  fullviewRef,
  rowRefs,
  onEnter,
}: RecentProjectsIntroProps) => (
  <section
    ref={introSectionRef}
    className={`recent-intro${introOpen ? " recent-intro--open" : ""}`}
  >
    <div
      ref={introTitleRef}
      className={`recent-intro-title${isTitleMerging ? " is-merging" : ""}`}
    >
      <div className="recent-intro-title__frame">
        <div className="recent-intro-title__eyebrow">
          <p className="recent-intro-title__kicker">Program Portfolio 2026</p>
          <span className="recent-intro-title__pulse">Impact Chapters</span>
        </div>
        <p className="recent-intro-title__lede">
          Verified delivery. Human-first action. Credible community impact.
        </p>
        <h1 className="recent-intro-title__heading">
          <span>Recent</span>
          <span>Projects</span>
        </h1>
        <div className="recent-intro-title__subheading">
          <span className="recent-intro-title__subheading-lead">
            Where urgent community need is turned into measured action.
          </span>
          <span className="recent-intro-title__subheading-note">
            Every chapter is built to show visible delivery, partner-ready
            reporting, and the kind of on-ground proof that earns trust.
          </span>
        </div>
        <div className="recent-intro-title__footer">
          <div className="recent-intro-title__highlights">
            <span>Human-first delivery</span>
            <span>Verified outcomes</span>
            <span>Partner-ready reporting</span>
          </div>

          <button
            type="button"
            disabled={introOpen || isIntroTransitioning}
            onClick={onEnter}
            className={`recent-intro-enter${introOpen || isIntroTransitioning ? " is-hidden" : ""}`}
          >
            <span className="recent-intro-enter__copy">
              <span className="recent-intro-enter__label">Explore Projects</span>
              <span className="recent-intro-enter__hint">Open the live portfolio</span>
            </span>
            <span className="recent-intro-enter__icon" aria-hidden="true">
              +
            </span>
          </button>
        </div>
      </div>
    </div>

    <div ref={gridRef} className="recent-intro-grid">
      {introRows.map((row, rowIndex) => (
        <div
          key={`intro-row-${rowIndex}`}
          ref={(node) => {
            if (node) {
              rowRefs.current[rowIndex] = node;
            }
          }}
          className="recent-intro-row"
        >
          {row.map((image, colIndex) => (
            <div
              key={`intro-item-${rowIndex}-${colIndex}`}
              className="recent-intro-row__item"
            >
              <div className="recent-intro-row__item-inner">
                <div
                  className="recent-intro-row__item-img"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>

    <div ref={fullviewRef} className="recent-intro-fullview" />
  </section>
);

export default RecentProjectsIntro;
