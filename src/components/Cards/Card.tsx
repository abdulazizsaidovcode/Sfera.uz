import { HoverEffect } from "../ui/card-hover-effect";

export function Card({ projects }) {
    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={projects} />
        </div>
    );
}
