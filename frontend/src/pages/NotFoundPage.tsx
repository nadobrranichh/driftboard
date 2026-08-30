import { Link } from "react-router";
import Button from "../components/Button";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col justify-center items-center gap-2">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p>Looks like you entered an invalid url.</p>
      <Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          Go back
        </Link>
      </Button>
    </main>
  );
}
