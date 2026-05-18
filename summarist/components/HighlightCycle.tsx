'use client'; 

interface HighlightCycleProps {
    items: string[];
    activeIndex: number;
}

export default function HighlightCycle({ items, activeIndex }: HighlightCycleProps) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index} className={ `text-3xl mb-4 font-bold transition-colors duration-500 ${
                    index === activeIndex ? 'text-[#2bd97c]' : 'text-[#6b757b]'}`}
                    >
                    {item}
                </li>
            ))}
        </ul>
    );
}
