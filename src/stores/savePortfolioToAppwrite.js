import { databases, storage } from "@/lib/config/appwrite";

export const savePortfolioToAppwrite = async (formData) => {
  const {
    firstName,
    middleName,
    surname,
    suffix,
    userImage,
    userImageFile,
    email,
    contactNumber,
    socials = [],
    country,
    province,
    city,
    postal,
    elementary,
    juniorHigh,
    seniorHigh,
    degreeLevel = [],
    certificates = [],
    jobs = [],
    skills = [],
    projects = [],
    selectedTemplate,
  } = formData;
  console.log("Received formData:", { userImage, userImageFile }); // Debug log
  try {
    // Step 1: Validate environment variables
    if (!process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID) {
      throw new Error("NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID is not defined");
    }
    if (!process.env.NEXT_PUBLIC_APPWRITE_DB_ID) {
      throw new Error("NEXT_PUBLIC_APPWRITE_DB_ID is not defined");
    }
    if (!process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID) {
      throw new Error("NEXT_PUBLIC_APPWRITE_COLLECTION_ID is not defined");
    }

    // Step 2: Prepare the document data
    console.log("degreeLevel input:", degreeLevel); // Debug log
    const degreeLevelString = typeof degreeLevel === "object" && degreeLevel !== null
      ? Object.entries(degreeLevel)
          .filter(([_, value]) => value.checked)
          .map(([key, value]) => `${key}: ${value.university || "Unknown"}`)
          .join(", ")
          .slice(0, 100)
      : "";

    // Ensure portfolioTemp is a string and no longer than 10 chars (updated schema limit)
    const portfolioTempString = typeof selectedTemplate === "string"
      ? selectedTemplate.slice(0, 10)
      : String(selectedTemplate || "").slice(0, 10);

    const jobsString = JSON.stringify(jobs.filter(job => job.trim() !== "") || []);
    const documentData = {
      firstName: firstName?.trim() || "",
      middleName: middleName?.trim() || null,
      lastName: surname?.trim() || "",
      suffix: suffix?.trim() || null,
      email: email?.trim() || null,
      contactNumber: contactNumber?.trim() || null,
      socials: JSON.stringify(socials || []),
      country: country?.trim() || null,
      province: province?.trim() || null,
      city: city?.trim() || null,
      postal: postal?.trim() || null,
      elementary: elementary?.trim() || null,
      juniorHigh: juniorHigh?.trim() || null,
      seniorHigh: seniorHigh?.trim() || null,
      degreeLevel: degreeLevelString,
      skills: JSON.stringify(skills || []),
      job: jobsString,
      portfolioTemp: portfolioTempString,
    };

    // Step 3: Upload userImage to Appwrite Storage
    let imageFileId = null;
    if (userImage && userImageFile) {
      console.log("Uploading user image...");
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
        "unique()",
        userImageFile
      );
      imageFileId = response.$id;
      documentData.userImage = imageFileId;
      console.log("User image uploaded successfully:", imageFileId);
    }
    // Step 4: Upload certificates to Appwrite Storage
    let certificateData = Array.isArray(certificates) ? certificates.map((cert) => ({ ...cert })) : [];
    if (certificateData.length > 0) {
      console.log("Uploading certificate images...");
      for (let i = 0; i < certificateData.length; i++) {
        if (certificateData[i].imageFile instanceof File && certificateData[i].imageFile.type.startsWith("image/")) {
          const response = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
            "unique()",
            certificateData[i].imageFile
          );
          certificateData[i].imageId = response.$id;
        } else {
          certificateData[i].imageId = null;
          console.log(`Certificate image is not a valid File object or not an image at index ${i}:`, certificateData[i].imageFile);
        }
        // Ensure only description and imageId are stored
        certificateData[i] = {
          description: certificateData[i].description || "",
          imageId: certificateData[i].imageId || null,
        };
      }
      documentData.certificates = JSON.stringify(certificateData);
      console.log("Certificates processed:", certificateData);
    } else {
      documentData.certificates = "[]";
      console.log("No certificates to process");
    }

    // Step 5: Upload project logos to Appwrite Storage
    let projectData = Array.isArray(projects) ? projects.map((project) => ({ ...project })) : [];
    if (projectData.length > 0) {
      console.log("Uploading project logos...");
      for (let i = 0; i < projectData.length; i++) {
        if (projectData[i].logo instanceof File) {
          try {
            const response = await storage.createFile(
              process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
              "unique()",
              projectData[i].logo
            );
            projectData[i].logo = response.$id;
            console.log(`Project logo uploaded successfully for project ${i}:`, response.$id);
          } catch (error) {
            console.error(`Failed to upload project logo for project ${i}:`, error);
            throw error;
          }
        } else {
          projectData[i].logo = null;
          console.log(`Project logo is not a File object at index ${i}:`, projectData[i].logo);
        }
      }
      documentData.projects = JSON.stringify(projectData);
      console.log("Projects processed:", projectData);
    } else {
      documentData.projects = "[]";
      console.log("No projects to process");
    }
    // Step 6: Save the document to Appwrite Database
    console.log("Saving document to database...");
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      "unique()",
      documentData
    );

    alert("Document saved successfully:");
    console.log("Document saved successfully:", response);
    return true; // Indicate success
  } catch (error) {
    console.error("Detailed error saving to Appwrite:", error.message, error);
    throw new Error(`Failed to save portfolio data to Appwrite: ${error.message}`);
  }
};