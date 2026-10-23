import { Link } from "react-router";
import GitHubIcon from "../assets/github-svgrepo-com.svg";
import LinkedInIcon from "../assets/linkedin-svgrepo-com.svg";

export default function Footer() {
  return (
    <footer className="bg-primary-dark px-10 py-6 flex justify-between items-center">
      <p className="text-bg text-sm">
        &copy; {new Date().getFullYear()} DriftBoard
      </p>
      <div className="flex gap-4">
        <Link to="https://github.com/nadobrranichh" target="_blank">
          <img className="h-6" src={GitHubIcon} />
        </Link>

        <Link
          to="https://www.linkedin.com/in/nazar-shchepaniak-14906635a/"
          target="_blank"
        >
          <img className="h-6" src={LinkedInIcon} />
        </Link>
      </div>
    </footer>
  );
}
