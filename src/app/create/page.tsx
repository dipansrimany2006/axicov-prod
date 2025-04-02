"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { GridBackground } from "@/components/core/grid-background";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AgentDetailsForm } from "@/components/create/agent-details-form";
import { CreateNavigation } from "@/components/create/create-navigation";
import { ToolSelector } from "@/components/core/tool-selector";

export default function CreateAgentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    systemMessage: "",
    responseStyle: 50, // Default to middle/balanced
  });
  const [selectedTools, setSelectedTools] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("details");
  const [showPreview, setShowPreview] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Check form validity
  useEffect(() => {
    const valid =
      formData.name.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.systemMessage.trim() !== "";
    setIsFormValid(valid);
  }, [formData]);

  // Animate in on mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Add a sample markdown example to help users understand what they can do
  const addExampleMarkdown = () => {
    const exampleMarkdown = `# Agent Instructions

## Purpose
This agent is designed to help users with research tasks and information gathering.

### Capabilities
- **Web Search**: Find relevant information online
- **Data Analysis**: Process and analyze data sets
- **Content Summarization**: Create concise summaries of long texts

## Response Format
When responding to queries, follow this structure:
1. Acknowledge the question
2. Provide a direct answer
3. Include supporting details and sources

\`\`\`
Example response format:
I understand you're asking about [topic].
The answer is [concise response].
According to [source], [additional details]...
\`\`\`

> Note: Always maintain a helpful and informative tone.`;

    setFormData((prev) => ({ ...prev, systemMessage: exampleMarkdown }));
    setShowPreview(true);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTool = (toolIndex: number) => {
    setSelectedTools((prev) => [...prev, toolIndex]);
  };

  const handleRemoveTool = (toolIndex: number) => {
    setSelectedTools((prev) => prev.filter((idx) => idx !== toolIndex));
  };

  const handleClearTools = () => {
    setSelectedTools([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ ...formData, tools: selectedTools });

    // Navigate back to the dashboard
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white relative overflow-x-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GridBackground />
      </div>

      {/* Simple Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[120px] z-0" />

      {/* Content */}
      <div
        className={`relative z-10 container mx-auto px-4 py-12 transition-all duration-1000 ease-out ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-6 group"
          >
            <ArrowLeft
              size={16}
              className="mr-2 group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-5xl font-bold mb-4 text-white">
            Create New Agent
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Configure your custom AI agent with the capabilities you need
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-3">
            <CreateNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onCancel={() => router.push("/")}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <form onSubmit={handleSubmit}>
              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] shadow-xl overflow-hidden">
                  <div className="p-8 border-b border-[#2a2a2a]">
                    <h2 className="text-2xl font-semibold text-white">
                      Agent Details
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Define your agent's identity and behavior
                    </p>
                  </div>

                  <div className="p-8">
                    <AgentDetailsForm
                      name={formData.name}
                      description={formData.description}
                      systemMessage={formData.systemMessage}
                      responseStyle={formData.responseStyle}
                      showPreview={showPreview}
                      onNameChange={(value) => handleInputChange("name", value)}
                      onDescriptionChange={(value) =>
                        handleInputChange("description", value)
                      }
                      onSystemMessageChange={(value) =>
                        handleInputChange("systemMessage", value)
                      }
                      onResponseStyleChange={(value) =>
                        handleInputChange("responseStyle", value)
                      }
                      onTogglePreview={setShowPreview}
                      onAddExampleMarkdown={addExampleMarkdown}
                    />
                  </div>

                  <div className="border-t border-[#2a2a2a] p-6 flex justify-end bg-[#1a1a1a]">
                    <button
                      type="button"
                      className="px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      onClick={() => setActiveTab("tools")}
                    >
                      Next: Select Tools
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Tools Tab */}
              {activeTab === "tools" && (
                <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] shadow-xl overflow-hidden">
                  <div className="p-8 border-b border-[#2a2a2a]">
                    <h2 className="text-2xl font-semibold text-white">
                      Tools & Capabilities
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Select the tools your agent can use
                    </p>
                  </div>

                  <div className="p-8">
                    <ToolSelector
                      selectedTools={selectedTools}
                      onAddTool={handleAddTool}
                      onRemoveTool={handleRemoveTool}
                      onClearTools={handleClearTools}
                    />
                  </div>

                  <div className="border-t border-[#2a2a2a] p-6 flex justify-between bg-[#1a1a1a]">
                    <button
                      type="button"
                      className="px-6 py-3 border border-[#2a2a2a] rounded-xl text-gray-300 hover:bg-[#252525] transition-all duration-300 flex items-center"
                      onClick={() => setActiveTab("details")}
                    >
                      <svg
                        className="mr-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-all duration-300 flex items-center"
                    >
                      <Sparkles className="mr-2 w-4 h-4" />
                      Create Agent
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
