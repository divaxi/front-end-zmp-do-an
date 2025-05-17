import { useSpring, animated } from "@react-spring/web";
import { Loader2 } from "lucide-react";

interface LoadingTemplateProps {
  templateName?: string;
}

const LoadingTemplate = ({ templateName }: LoadingTemplateProps) => {
  const rotateStyles = useSpring({
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    loop: true,
    config: { duration: 1000 },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50">
      <animated.div style={rotateStyles} className="mb-6">
        <Loader2 className="w-12 h-12 text-primary" />
      </animated.div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Loading Template
        </h2>
        <p className="text-muted-foreground">
          {templateName
            ? `Loading "${templateName}"...`
            : "Please wait while we prepare your experience."}
        </p>
      </div>
    </div>
  );
};

export default LoadingTemplate;
