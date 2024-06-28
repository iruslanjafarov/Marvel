const Skeleton = () => {
    return (
        <div className="about-select">
            <h2 className="about-select__title">Please select a character to see information</h2>
            <div className="about-current">
                <div className="about-current__header">
                    <div className="pulse about-current__avatar"></div>
                    <div className="about-current__mini pulse"></div>
                </div>
                <div className="about-current__block pulse"></div>
                <div className="about-current__block pulse"></div>
                <div className="about-current__block pulse"></div>
            </div>
        </div>
    );
};

export default Skeleton;