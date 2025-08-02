
import "./globals.css";

export const metadata = {
  title: "Sawariya Novelty - Vikram Das",
  description: "Created for Vikram Das Sartra",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
          {children}
      </body>
    </html>
  );
}