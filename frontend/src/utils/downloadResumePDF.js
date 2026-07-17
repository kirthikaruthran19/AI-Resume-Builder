import html2pdf from "html2pdf.js";

export const downloadResumePDF = (
    element,
    fileName = "Resume.pdf"
) => {

    if (!element) return;

    const options = {

        margin: 0.3,

        filename: fileName,

        image: {
            type: "jpeg",
            quality: 1,
        },

        html2canvas: {
            scale: 2,
            useCORS: true,
        },

        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait",
        },

        pagebreak: {
            mode: ["avoid-all", "css", "legacy"],
        },

    };

    html2pdf()

        .set(options)

        .from(element)

        .save();

};