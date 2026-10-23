import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/40 py-8 text-center">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
          VALORANT Arsenal
        </p>
        <p className="mt-2 text-xs text-muted-foreground/60">
          VALORANT Arsenal is an unofficial fan site. It is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc. Riot Games' legal information is available at{" "}
          <a
            href="https://www.riotgames.com/en/legal"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground/80"
          >
            Riot Games Legal Jibber Jabber
          </a>
          .
        </p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Released under the MIT License. &copy; {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
}
