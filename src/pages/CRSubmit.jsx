import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CRSubmit = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    // Requester Details
    const [requesterData, setRequesterData] = useState({
        name: user?.username || '',
        email: user?.email || '',
        contact: user?.contact || '',
        isms: 'Enabled'
    });

    // Main Form Data
    const [formData, setFormData] = useState({
        project_department: '',
        description: '',
        reason: '',
        planned_start: '',
        planned_end: '',
        priority: 'P3',
        impacted_users_apps: ''
    });

    // Files
    const [files, setFiles] = useState({
    supporting_documents: []
});

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle File Change
    const handleFileChange = (e) => {

    setFiles({
        ...files,
        [e.target.name]: e.target.files
    });

};

    // Submit Form
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        const data = new FormData();

        // Main Form Data
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        // Requester Data
        Object.keys(requesterData).forEach((key) => {
            data.append(key, requesterData[key]);
        });

        // Files
        if (files.supporting_documents.length > 0) {

    Array.from(files.supporting_documents).forEach((file) => {
        data.append('supporting_documents', file);
    });

}

        try {

            await api.post('/cr', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate('/crs');

        } catch (err) {

            console.error(err);
            alert('Failed to submit Change Request');

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

            {/* Header */}
            <div className="bg-blue-900 px-8 py-6 text-white">

                <h2 className="text-3xl font-bold">
                    Submit New Change Request
                </h2>

                <p className="text-blue-200 text-sm mt-2">
                    Submit a new ITIL Change Request for review
                </p>

                {/* Requester Details */}
                <div className="mt-6 bg-white/10 border border-blue-700 rounded-xl p-5">

                    <h3 className="text-lg font-semibold mb-5">
                        Change Requester Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* Name */}
                        <div>
                            <label className="block text-xs uppercase text-blue-200 mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                value={requesterData.name}
                                onChange={(e) =>
                                    setRequesterData({
                                        ...requesterData,
                                        name: e.target.value
                                    })
                                }
                                className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none border border-gray-300"
                            />
                        </div>

                        {/* Contact */}
                        <div>
                            <label className="block text-xs uppercase text-blue-200 mb-2">
                                Contact Number
                            </label>

                            <input
                                type="text"
                                value={requesterData.contact}
                                onChange={(e) =>
                                    setRequesterData({
                                        ...requesterData,
                                        contact: e.target.value
                                    })
                                }
                                className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none border border-gray-300"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs uppercase text-blue-200 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={requesterData.email}
                                onChange={(e) =>
                                    setRequesterData({
                                        ...requesterData,
                                        email: e.target.value
                                    })
                                }
                                className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none border border-gray-300"
                            />
                        </div>

                        {/* ISMS */}
                        <div>
                            <label className="block text-xs uppercase text-blue-200 mb-2">
                                ISMS
                            </label>

                            <input
                                type="text"
                                value={requesterData.isms}
                                onChange={(e) =>
                                    setRequesterData({
                                        ...requesterData,
                                        isms: e.target.value
                                    })
                                }
                                className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none border border-gray-300"
                            />
                        </div>

                    </div>

                </div>

            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="p-8 space-y-6"
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Project Department */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Project / Department *
                        </label>

                        <input
                            type="text"
                            name="project_department"
                            required
                            value={formData.project_department}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
                            placeholder="e.g., Network Infrastructure"
                        />
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Priority *
                        </label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none bg-white"
                        >
                            <option value="P3">
                                P3 - Low
                            </option>

                            <option value="P2">
                                P2 - Medium
                            </option>

                            <option value="P1">
                                P1 - High (Urgent)
                            </option>
                        </select>
                    </div>
</div>
                    {/* Description */}
                    <div className="md:col-span-2">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description of Change *
                        </label>

                        <textarea
                            name="description"
                            required
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
                            placeholder="Detailed description of what is changing..."
                        />

                    </div>

                    {/* Reason */}
                    <div className="md:col-span-2">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Reason for Change *
                        </label>

                        <textarea
                            name="reason"
                            required
                            rows="3"
                            value={formData.reason}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
                            placeholder="Why is this change necessary?"
                        />

                    </div>

                    {/* Start */}
                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Planned Start Date & Time *
                        </label>

                        <input
                            type="datetime-local"
                            name="planned_start"
                            required
                            value={formData.planned_start}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
                        />

                    </div>

                    {/* End */}
                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Planned End Date & Time *
                        </label>

                        <input
                            type="datetime-local"
                            name="planned_end"
                            required
                            value={formData.planned_end}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
                        />

                    </div>

                    {/* Impacted Users */}
                    <div className="md:col-span-2">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Users / Applications Impacted *
                        </label>

                        <input
                            type="text"
                            name="impacted_users_apps"
                            required
                            value={formData.impacted_users_apps}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
                            placeholder="e.g., ERMS, All Head Office Users"
                        />

                    </div>

                    {/* Implementation Plan */}
                    <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-200">

    <label className="block text-sm font-semibold text-gray-700 mb-2">
        Supporting Documents
    </label>

    <input
        type="file"
        name="supporting_documents"
        multiple
        onChange={handleFileChange}
        className="w-full text-sm text-gray-500"
    />

</div>

                {/* Buttons */}
                <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">

                    <button
                        type="button"
                        onClick={() => navigate('/crs')}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition disabled:opacity-50"
                    >
                        {loading
                            ? 'Submitting...'
                            : 'Submit Change Request'}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default CRSubmit;
