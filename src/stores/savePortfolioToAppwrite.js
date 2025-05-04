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
    certificateFiles = [],
    jobs = [],
    skills = [],
    projects = [],
    selectedTemplate,
  } = formData;

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
    // Convert degreeLevel array to a single string, truncate to 100 chars if needed
    const degreeLevelString = Array.isArray(degreeLevel) && degreeLevel.length > 0
      ? degreeLevel.join(", ").slice(0, 100)
      : "";

    // Ensure portfolioTemp is a string and no longer than 10 chars (updated schema limit)
    const portfolioTempString = typeof selectedTemplate === "string"
      ? selectedTemplate.slice(0, 10)
      : String(selectedTemplate || "").slice(0, 10);

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
    let certificateFileIds = [];
    if (Array.isArray(certificates) && certificates.length > 0 && Array.isArray(certificateFiles) && certificateFiles.length > 0) {
      console.log("Uploading certificates...");
      for (const file of certificateFiles) {
        if (file instanceof File) {
          const response = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
            "unique()",
            file
          );
          certificateFileIds.push(response.$id);
        }
      }
      documentData.certificates = JSON.stringify(certificateFileIds);
      console.log("Certificates uploaded successfully:", certificateFileIds);
    }

    // Step 5: Upload project logos to Appwrite Storage
    let projectData = Array.isArray(projects) ? projects.map((project) => ({ ...project })) : [];
    if (projectData.length > 0) {
      console.log("Uploading project logos...");
      for (let i = 0; i < projectData.length; i++) {
        const logoFile = projectData[i].logoFile;
        if (logoFile instanceof File) {
          const response = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
            "unique()",
            logoFile
          );
          projectData[i].logo = response.$id;
        } else {
          projectData[i].logo = null;
        }
      }
      documentData.projects = JSON.stringify(projectData);
      console.log("Project logos uploaded successfully:", projectData);
    }

    // Step 6: Save the document to Appwrite Database
    console.log("Saving document to database...");
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      "unique()",
      documentData
    );

    console.log("Document saved successfully:", response);
    return true; // Indicate success
  } catch (error) {
    console.error("Detailed error saving to Appwrite:", error.message, error);
    throw new Error(`Failed to save portfolio data to Appwrite: ${error.message}`);
  }
};