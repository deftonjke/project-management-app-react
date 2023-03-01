import './Footer.scss';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="narrow-container">
        <div className="footer-card-container">
          <div className="footer-card-item">
            <div>
              <a
                href="https://github.com/tlkv"
                target="_blank"
                rel="noreferrer"
                className="footer-card-link"
              >
                tlkv
                <i className="fa-brands fa-github" />
              </a>
            </div>
            <div>
              <a
                href="https://github.com/deftonjke"
                target="_blank"
                rel="noreferrer"
                className="footer-card-link"
              >
                deftonjke
                <i className="fa-brands fa-github" />
              </a>
            </div>
          </div>
          <div className="footer-card-item">© 2022</div>
          <div className="footer-card-item">
            <a
              href="https://rs.school/react/"
              target="_blank"
              rel="noreferrer"
              className="course-logo"
            >
              Link
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
