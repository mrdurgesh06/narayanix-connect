using System.Net;
using NarayanixConnect.Api.Entities;

namespace NarayanixConnect.Api.Services;

/// <summary>
/// Notification email bodies. Every user-supplied value is HTML-encoded
/// (the old Node version interpolated raw input into the HTML).
/// </summary>
public static class EmailTemplates
{
    private static string E(string? value) => WebUtility.HtmlEncode(string.IsNullOrWhiteSpace(value) ? "-" : value);

    public static (string Subject, string Html) ForContact(Contact c) => (
        "New Contact Enquiry — NARAYANIX Connect",
        $"""
        <h2>New Contact Enquiry</h2>
        <p><strong>Name:</strong> {E(c.Name)}</p>
        <p><strong>Company:</strong> {E(c.Company)}</p>
        <p><strong>Email:</strong> {E(c.Email)}</p>
        <p><strong>Phone:</strong> {E(c.Phone)}</p>
        <p><strong>Message:</strong> {E(c.Message)}</p>
        """);

    public static (string Subject, string Html) ForProposal(Proposal p) => (
        "New Proposal Request — NARAYANIX Connect",
        $"""
        <h2>New Proposal Request</h2>
        <p><strong>Company:</strong> {E(p.Company)}</p>
        <p><strong>Name:</strong> {E(p.Name)}</p>
        <p><strong>Email:</strong> {E(p.Email)}</p>
        <p><strong>Phone:</strong> {E(p.Phone)}</p>
        <p><strong>Website:</strong> {E(p.Website)}</p>
        <p><strong>Service:</strong> {E(p.Service)}</p>
        <p><strong>Budget:</strong> {E(p.Budget)}</p>
        <p><strong>Message:</strong> {E(p.Message)}</p>
        """);
}
