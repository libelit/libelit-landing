import Image from "next/image";

interface FeatureCardProps {
    icon: string,
    iconAlt: string,
    title: string,
    description: string,
    className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, iconAlt, title, description, className }) => {
    return (
        <>
            {/* part of grid container, layout of wrapper container of following section should be grid container */}
            <div className="grid-item--icon">
                <div className="icon-container">
                    <Image src={icon} alt={iconAlt} />
                </div>
            </div>
            <div className="grid-item--title d-h4 text-center">
                {title}
            </div>
            <div className="grid-item--description text-lg text-regular color-primary-600 text-center">
               {description}
            </div>
        </>
    )
}

export default FeatureCard;