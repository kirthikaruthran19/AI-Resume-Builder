from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile


# ==========================================================
# Register Serializer
# ==========================================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User

        fields = (
            "username",
            "email",
            "password",
            "confirm_password",
            "first_name",
            "last_name",
        )

    def validate(self, data):

        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password": "Passwords do not match."
                }
            )

        return data

    def create(self, validated_data):

        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )

        return user


# ==========================================================
# Profile Serializer
# ==========================================================

class ProfileSerializer(serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField()

    email = serializers.EmailField(source="user.email")

    first_name = serializers.CharField(source="user.first_name")

    last_name = serializers.CharField(source="user.last_name")

    class Meta:

        model = Profile

        fields = (
            "first_name",
            "last_name",
            "full_name",
            "email",
            "phone",
            "location",
            "profile_image",
        )

    def get_full_name(self, obj):

        return f"{obj.user.first_name} {obj.user.last_name}".strip()

    def update(self, instance, validated_data):

        user_data = validated_data.pop("user", {})

        instance.user.first_name = user_data.get(
            "first_name",
            instance.user.first_name,
        )

        instance.user.last_name = user_data.get(
            "last_name",
            instance.user.last_name,
        )

        instance.user.email = user_data.get(
            "email",
            instance.user.email,
        )

        instance.user.save()

        instance.phone = validated_data.get(
            "phone",
            instance.phone,
        )

        instance.location = validated_data.get(
            "location",
            instance.location,
        )

        if "profile_image" in validated_data:

            instance.profile_image = validated_data["profile_image"]

        instance.save()

        return instance