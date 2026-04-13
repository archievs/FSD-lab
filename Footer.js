function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Placement Tracker &nbsp;·&nbsp; Built with React ⚛️ &nbsp;·&nbsp; Experiment 5</p>
    </footer>
  );
}

export default Footer;