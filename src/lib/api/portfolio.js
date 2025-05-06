import { databases, storage } from "@/lib/config/appwrite";
import { ID, Query } from "appwrite";

/**
 * Fetches a portfolio by ID
 * @param {string} portfolioId - The ID of the portfolio to fetch
 * @returns {Promise<Object>} - Portfolio data with processed image URLs
 */
export const getPortfolioById = async (portfolioId) => {
  try {
    // Check for required environment variables
    const dbId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;
    
    // Return mock data for development if any environment variable is missing
    if (!dbId || !collectionId || !bucketId) {
      console.warn('Missing environment variables. Using mock data instead.');
      return getMockPortfolioData();
    }

    // Fetch portfolio document from database
    const portfolio = await databases.getDocument(
      dbId,
      collectionId,
      portfolioId
    );

    // Process the portfolio data
    const processedPortfolio = await processPortfolioData(portfolio);
    
    return processedPortfolio;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    // Return mock data in case of errors during development
    console.warn('Returning mock data due to error');
    return getMockPortfolioData();
  }
};

/**
 * Fetches the latest portfolio (for demo purposes)
 * @returns {Promise<Object>} - Latest portfolio data
 */
export const getLatestPortfolio = async () => {
  try {
    // Check for required environment variables
    const dbId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    // Return mock data for development if any environment variable is missing
    if (!dbId || !collectionId) {
      console.warn('Missing environment variables. Using mock data instead.');
      return getMockPortfolioData();
    }

    // Fetch the most recent portfolio document
    const portfolios = await databases.listDocuments(
      dbId,
      collectionId,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(1)
      ]
    );

    if (portfolios.documents.length === 0) {
      console.warn('No portfolios found. Using mock data instead.');
      return getMockPortfolioData();
    }

    // Process the portfolio data
    const processedPortfolio = await processPortfolioData(portfolios.documents[0]);
    
    return processedPortfolio;
  } catch (error) {
    console.error("Error fetching latest portfolio:", error);
    // Return mock data in case of errors during development
    console.warn('Returning mock data due to error');
    return getMockPortfolioData();
  }
};

/**
 * Processes raw portfolio data from Appwrite, converting file IDs to URLs
 * @param {Object} portfolioData - Raw portfolio data from Appwrite
 * @returns {Promise<Object>} - Processed portfolio data with file URLs
 */
const processPortfolioData = async (portfolioData) => {
  try {
    const result = { ...portfolioData };
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;
    
    // Skip image processing if bucket ID is missing
    if (!bucketId) {
      console.warn('NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID is not defined. Skipping image processing.');
      return result;
    }

    // Process user profile image
    if (result.userImage) {
      try {
        result.userImageUrl = storage.getFilePreview(
          bucketId,
          result.userImage,
          2000, // width
          2000, // height
          "top", // gravity
          100 // quality
        );
      } catch (error) {
        console.error("Error processing user image:", error);
        result.userImageUrl = null;
      }
    }

    // Process certificates
    if (result.certificates) {
      try {
        const certificatesArray = JSON.parse(result.certificates);
        result.certificatesProcessed = await Promise.all(
          certificatesArray.map(async (cert) => {
            if (cert.imageId) {
              return {
                ...cert,
                imageUrl: storage.getFilePreview(
                  bucketId,
                  cert.imageId,
                  800, // width
                  600, // height
                  "center", // gravity
                  80 // quality
                )
              };
            }
            return cert;
          })
        );
      } catch (error) {
        console.error("Error processing certificates:", error);
        result.certificatesProcessed = [];
      }
    } else {
      result.certificatesProcessed = [];
    }

    // Process projects
    if (result.projects) {
      try {
        const projectsArray = JSON.parse(result.projects);
        result.projectsProcessed = await Promise.all(
          projectsArray.map(async (project) => {
            if (project.logo) {
              return {
                ...project,
                logoUrl: storage.getFilePreview(
                  bucketId,
                  project.logo,
                  400, // width
                  400, // height
                  "center", // gravity
                  80 // quality
                )
              };
            }
            return project;
          })
        );
      } catch (error) {
        console.error("Error processing projects:", error);
        result.projectsProcessed = [];
      }
    } else {
      result.projectsProcessed = [];
    }

    // Process other JSON fields
    if (result.socials) {
      try {
        result.socialsArray = JSON.parse(result.socials);
      } catch {
        result.socialsArray = [];
      }
    }

    if (result.skills) {
      try {
        result.skillsArray = JSON.parse(result.skills);
      } catch {
        result.skillsArray = [];
      }
    }

    if (result.job) {
      try {
        result.jobsArray = JSON.parse(result.job);
      } catch {
        result.jobsArray = [];
      }
    }

    return result;
  } catch (error) {
    console.error("Error processing portfolio data:", error);
    return portfolioData; // Return original data in case of processing error
  }
};

/**
 * Provides mock portfolio data for development and testing
 * @returns {Object} Mock portfolio data
 */
const getMockPortfolioData = () => {
  return {
    $id: 'mock-portfolio-id',
    firstName: 'John',
    middleName: '',
    lastName: 'Doe',
    suffix: '',
    email: 'john.doe@example.com',
    contactNumber: '+639123456789',
    socialsArray: [
      { platform: 'LinkedIn', url: 'linkedin.com/in/johndoe' },
      { platform: 'GitHub', url: 'github.com/johndoe' }
    ],
    country: 'Philippines',
    province: 'Cebu',
    city: 'Cebu City',
    elementary: 'St. Mary\'s Elementary School',
    juniorHigh: 'St. John\'s Junior High School',
    seniorHigh: 'National High School',
    degreeLevel: 'undergraduate: Cebu Institute of Technology',
    userImageUrl: '/wapanchman.jpg',
    jobsArray: [
      'Full-Stack Developer',
      'Front-end Specialist',
      'UI/UX Designer'
    ],
    skillsArray: [
      'JavaScript',
      'React',
      'Node.js',
      'HTML/CSS',
      'UI/UX Design',
      'Appwrite',
      'Next.js'
    ],
    certificatesProcessed: [
      {
        description: 'Web Development Certification',
        imageUrl: '/wapanchman.jpg'
      },
      {
        description: 'UX Design Professional Certificate',
        imageUrl: '/wapanchman.jpg'
      }
    ],
    projectsProcessed: [
      {
        id: 1,
        name: 'E-commerce Website',
        link: 'https://example.com/ecommerce',
        logoUrl: '/wapanchman.jpg'
      },
      {
        id: 2,
        name: 'Portfolio Generator',
        link: 'https://example.com/portfolio',
        logoUrl: '/wapanchman.jpg'
      }
    ]
  };
}; 