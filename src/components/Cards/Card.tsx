import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { HoverEffect } from "../ui/card-hover-effect";

export function Card({ projects }) {
    return (
        <BackgroundBeamsWithCollision>
            <div className="w-full mx-auto">
                <HoverEffect items={projects} />
            </div>
        </BackgroundBeamsWithCollision>
    );
}
