"use client";

// ============================================================================
//  CHALLENGE: BUILD THE FOOTER
// ============================================================================
// 
// Welcome! Your colleague has assigned this component to you. Your goal is to build 
// a professional, full-featured footer for the store.
// 
// Follow these steps:
// 
// STEP 1: CREATE THE LAYOUT
// -------------------------
// Build a responsive grid layout with 4 columns for desktop and 1-2 for mobile:
// - Column 1: Brand logo/name and a brief description.
// - Column 2: "Shop" links (e.g., Men, Women, Accessories, Sale).
// - Column 3: "Support" links (e.g., FAQ, Returns, Shipping, Contact).
// - Column 4: Newsletter signup input and a subscribe button.
//
// STEP 2: STYLING
// -------------------------
// - Use Tailwind CSS classes like `bg-surface border-t border-border/50`.
// - Use `text-text-muted` for the links and description text.
// - Ensure links have a hover effect (e.g., `hover:text-primary transition-colors`).
// 
// STEP 3: COPYRIGHT SECTION
// -------------------------
// At the very bottom, keep the copyright text but ensure it sits below the new links.
// 
// Make sure to remove these instructions and the "Challenge In Progress" block 
// once you have finished!
// 

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* 
          YOUR CODE GOES HERE 
          Replace the div below with your new Footer implementation!
        */}
        <div className="text-center py-12 bg-bg-subtle rounded-3xl border border-border/50 border-dashed">
          <h2 className="text-xl font-bold text-text-main mb-2">🚧 Footer Challenge 🚧</h2>
          <p className="text-text-muted text-sm">Open `apps/frontend/src/components/Footer.tsx` to read the instructions and build this component.</p>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex justify-center items-center">
          <p className="text-text-muted text-sm text-center">
            &copy; {new Date().getFullYear()} EjadaStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
