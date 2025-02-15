'use client';
import { useEffect, useState } from 'react';
import { fetchCourses } from '../services/api';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import { Course } from '../types/course';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        console.log('Page: Starting to fetch courses...');
        const coursesData = await fetchCourses();
        console.log('Page: Received courses:', coursesData);
        
        const coursesArray = Array.isArray(coursesData) ? coursesData : [];
        
        setDebugInfo({
          timestamp: new Date().toISOString(),
          coursesReceived: coursesArray.length,
          hasData: Boolean(coursesArray),
          isArray: Array.isArray(coursesArray),
          rawData: coursesData
        });

        setCourses(coursesArray);
        setFilteredCourses(coursesArray);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Failed to load courses: ${errorMessage}`);
        console.error('Page: Error loading courses:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleSearch = (query: string) => {
    const searchTerm = query.toLowerCase();
    const filtered = courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.courseDescription.toLowerCase().includes(searchTerm) ||
      course.courseTopic.some(topic => 
        topic.toLowerCase().includes(searchTerm)
      )
    );
    setFilteredCourses(filtered);
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">Loading courses...</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-red-600 text-center">DeepLearning.AI</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Courses Available</h2>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      {error ? (
        <div className="text-center">
          <div className="text-red-500">{error}</div>
        </div>
      ) : !Array.isArray(filteredCourses) ? (
        <div className="text-center">
          <p className="text-red-500">Error: Courses data is not in the expected format</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">No courses found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </main>
  );
} 