import Image from 'next/image';
import { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900">{course.title}</h2>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {course.courseDescription}
        </p>
        
        {course.coursePartner?.map((partner, index) => (
          partner.logo && (
            <div key={index} className="flex items-center space-x-2 mt-4">
              <div className="relative w-6 h-6">
                <Image
                  src={partner.logo}
                  alt={partner.title || 'Partner logo'}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-gray-700">{partner.title}</span>
            </div>
          )
        ))}

        <div className="flex flex-wrap gap-2 mt-4">
          {course.courseTopic?.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 