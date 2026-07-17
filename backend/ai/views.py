import traceback

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .resume_mapper import save_generated_resume

from .services import (
    optimize_summary,
    analyze_ats_score,
    generate_complete_resume,
)


# ==========================================================
# AI Resume Optimizer
# ==========================================================

class OptimizeSummaryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        summary = request.data.get("summary", "").strip()

        if not summary:

            return Response(
                {
                    "success": False,
                    "message": "Summary is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            optimized = optimize_summary(summary)

            print("=" * 80)
            print("AI Optimizer Response")
            print(optimized)
            print("=" * 80)

            return Response(
                {
                    "success": True,
                    "original_summary": summary,
                    "optimized_summary": optimized,
                },
                status=status.HTTP_200_OK,
            )

        except Exception:

            print("=" * 80)
            print("AI Optimizer Error")
            traceback.print_exc()
            print("=" * 80)

            return Response(
                {
                    "success": False,
                    "message": "Failed to optimize summary.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ==========================================================
# ATS Resume Score Analyzer
# ==========================================================

class ATSScoreAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        resume_text = request.data.get("resume_text", "").strip()
        job_description = request.data.get("job_description", "").strip()

        if not resume_text:

            return Response(
                {
                    "success": False,
                    "message": "Resume text is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not job_description:

            return Response(
                {
                    "success": False,
                    "message": "Job description is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            result = analyze_ats_score(
                resume_text,
                job_description,
            )

            print("=" * 80)
            print("ATS Resume Score")
            print(result)
            print("=" * 80)

            return Response(
                {
                    "success": True,
                    "analysis": result,
                },
                status=status.HTTP_200_OK,
            )

        except Exception:

            print("=" * 80)
            print("ATS Resume Score Error")
            traceback.print_exc()
            print("=" * 80)

            return Response(
                {
                    "success": False,
                    "message": "Failed to analyze ATS score.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ==========================================================
# AI Resume Generator
# ==========================================================

class GenerateResumeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        data = request.data

        required_fields = [
            "full_name",
            "job_title",
            "education",
            "experience_level",
            "skills",
        ]

        missing_fields = []

        for field in required_fields:

            value = data.get(field)

            if value is None:
                missing_fields.append(field)

            elif isinstance(value, str) and not value.strip():
                missing_fields.append(field)

            elif isinstance(value, list) and len(value) == 0:
                missing_fields.append(field)

        if missing_fields:

            return Response(
                {
                    "success": False,
                    "message": "Required fields are missing.",
                    "missing_fields": missing_fields,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            result = generate_complete_resume(data)

            print("=" * 80)
            print("AI Resume Generator")
            print(result)
            print("=" * 80)

            if not result.get("success"):

                return Response(
                    result,
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            resume = save_generated_resume(
                request.user,
                data,
                result["data"],
            )

            return Response(
                {
                    "success": True,
                    "message": "Resume created successfully.",
                    "resume_id": resume.id,
                    "resume": result["data"],
                },
                status=status.HTTP_200_OK,
            )

        except Exception:

            print("=" * 80)
            print("AI Resume Generator Error")
            traceback.print_exc()
            print("=" * 80)

            return Response(
                {
                    "success": False,
                    "message": "Failed to generate resume.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )