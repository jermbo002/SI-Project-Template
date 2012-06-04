Imports Microsoft.VisualBasic
Imports System
Imports System.Data
Imports System.Collections.Generic
Imports System.Text
Imports System.Xml.Serialization

Namespace nsJSON
    Public Class DataSetToListClass
        Public ReturnDS As New List(Of RowClass)

        Public Sub New()
        End Sub

        Public Sub New(ByRef theDataTable As DataTable)
            For Each aRow As DataRow In theDataTable.Rows
                Dim dRow As New RowClass(aRow)
                ReturnDS.Add(dRow)
            Next
        End Sub
    End Class

    Public Class RowClass
        Public cols As New SerializableCols(Of String, Object)

        Public Sub New()
        End Sub

        Public Sub New(ByRef theDataRow As DataRow)
            For Each aCol As DataColumn In theDataRow.Table.Columns
                cols.Add(aCol.ColumnName, theDataRow(aCol.ColumnName))
            Next
        End Sub
    End Class

    <XmlRoot("cols")> _
    Public Class SerializableCols(Of TKey, TValue)
        Inherits Dictionary(Of TKey, TValue)
        Implements IXmlSerializable

        Public Function GetSchema() As System.Xml.Schema.XmlSchema Implements IXmlSerializable.GetSchema
            Return Nothing
        End Function

        Public Sub ReadXml(ByVal reader As System.Xml.XmlReader) Implements IXmlSerializable.ReadXml
            Dim keySerializer As New XmlSerializer(GetType(TKey))
            Dim valueSerializer As New XmlSerializer(GetType(TValue))
            Dim wasEmpty As Boolean = reader.IsEmptyElement

            reader.Read()

            If wasEmpty Then
                Return
            End If

            While reader.NodeType <> System.Xml.XmlNodeType.EndElement
                reader.ReadStartElement("item")
                reader.ReadStartElement("key")

                Dim key As TKey = CType(keySerializer.Deserialize(reader), TKey)
                reader.ReadEndElement()
                reader.ReadStartElement("value")
                Dim value As TValue = CType(valueSerializer.Deserialize(reader), TValue)
                reader.ReadEndElement()
                Me.Add(key, value)
                reader.ReadEndElement()
                reader.MoveToContent()
            End While

            reader.ReadEndElement()
        End Sub

        Public Sub WriteXml(ByVal writer As System.Xml.XmlWriter) Implements IXmlSerializable.WriteXml
            Dim keySerializer As New XmlSerializer(GetType(TKey))
            Dim valueSerializer As New XmlSerializer(GetType(TValue))
            For Each key As TKey In Me.Keys
                writer.WriteStartElement("item")
                writer.WriteStartElement("key")
                keySerializer.Serialize(writer, key)
                writer.WriteEndElement()
                writer.WriteStartElement("value")
                Dim value As Object = Me(key)
                valueSerializer.Serialize(writer, value)
                writer.WriteEndElement()
                writer.WriteEndElement()
            Next
        End Sub
    End Class

End Namespace