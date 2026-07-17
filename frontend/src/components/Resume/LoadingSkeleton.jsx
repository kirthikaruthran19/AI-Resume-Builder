import "./LoadingSkeleton.css";

function LoadingSkeleton() {

    return (

        <div className="resume-skeleton">

            {

                [...Array(6)].map((_, index) => (

                    <div
                        key={index}
                        className="skeleton-card"
                    >

                        <div className="skeleton-title"></div>

                        <div className="skeleton-line"></div>

                        <div className="skeleton-line short"></div>

                        <div className="skeleton-buttons"></div>

                    </div>

                ))

            }

        </div>

    );

}

export default LoadingSkeleton;