import GitHubIcon from "../assets/github-svgrepo-com.svg";
import LinkedInIcon from "../assets/linkedin-svgrepo-com.svg";

export default function Footer() {
  return (
    <footer className="bg-primary-dark px-10 py-6 flex justify-between items-center">
      <p className="text-bg text-sm">
        &copy; {new Date().getFullYear()} DriftBoard
      </p>
      <div className="flex gap-4">
        <img className="h-6" src={GitHubIcon} />
        <img className="h-6" src={LinkedInIcon} />
      </div>
    </footer>
  );
}
