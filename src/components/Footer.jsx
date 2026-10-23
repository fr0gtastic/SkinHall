import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/40 py-8 text-center">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
          SkinAtlas
        </p>
        <p className="mt-2 text-xs text-muted-foreground/60">
          SkinAtlas is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc. This is an unofficial, fan-made project created under Riot Games' "Legal Jibber Jabber" policy.
        </p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Released under the MIT License. &copy; {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
}
