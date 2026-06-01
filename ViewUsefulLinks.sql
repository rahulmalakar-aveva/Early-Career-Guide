-- ============================================
-- View All Useful Links in Database
-- ============================================

-- Connection: (localdb)\EarlyCareersDB
-- Database: EarlyCareersDb

-- View all links with formatted output
SELECT
    CONVERT(VARCHAR(36), Id) AS Id,
    Title,
    Url,
    Category,
    Description
FROM UsefulLinks
ORDER BY Category, Title;

-- Count by category
SELECT
    Category,
    COUNT(*) AS LinkCount
FROM UsefulLinks
GROUP BY Category
ORDER BY Category;

-- Total count
SELECT COUNT(*) AS TotalLinks
FROM UsefulLinks;
