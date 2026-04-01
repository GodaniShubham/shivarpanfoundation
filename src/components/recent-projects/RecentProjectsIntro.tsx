import type { MutableRefObject, RefObject } from "react";

interface RecentProjectsIntroProps {
  introRows: string[][];
  introSectionRef: RefObject<HTMLElement | null>;
  introTitleRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  rowRefs: MutableRefObject<HTMLDivElement[]>;
  onExplore?: () => void;
  showOverlay?: boolean;
}

const RecentProjectsIntro = ({
  introRows,
  introSectionRef,
  introTitleRef,
  gridRef,
  rowRefs,
  onExplore,
  showOverlay = true,
}: RecentProjectsIntroProps) => (
  <section
    ref={introSectionRef}
    className="recent-intro"
  >
    {showOverlay ? (
      <div
        ref={introTitleRef}
        className="recent-intro-title"
      >
        <div className="recent-intro-title__frame">
          <div className="recent-intro-title__eyebrow">
            <p className="recent-intro-title__kicker">Program Portfolio 2026</p>
            <span className="recent-intro-title__pulse">Impact Chapters</span>
          </div>
          <p className="recent-intro-title__lede">
            Verified delivery. Human-first action.
          </p>
          <h1 className="recent-intro-title__heading">
            <span>Recent</span>
            <span>Projects</span>
          </h1>
          <div className="recent-intro-title__subheading">
            <span className="recent-intro-title__subheading-lead">
              Urgent need, measured action.
            </span>
            <span className="recent-intro-title__subheading-note">
              Live projects, clear reporting, direct support.
            </span>
          </div>
          <div className="recent-intro-title__footer">
            <div className="recent-intro-title__highlights">
              <span>Live projects</span>
              <span>Direct support</span>
              <span>Clear reporting</span>
            </div>
            {onExplore ? (
              <button
                type="button"
                onClick={onExplore}
                className="recent-intro-enter"
              >
                <span className="recent-intro-enter__copy">
                  <span className="recent-intro-enter__label">Explore Projects</span>
                  <span className="recent-intro-enter__hint">Scroll to the live portfolio</span>
                </span>
                <span className="recent-intro-enter__icon" aria-hidden="true">
                  +
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    ) : null}

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
  </section>
);

export default RecentProjectsIntro;
